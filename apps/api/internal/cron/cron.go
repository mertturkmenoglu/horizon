package cron

import (
	"horizon/internal/api"
	"horizon/internal/api/v1/dto"
	"horizon/internal/db"
	"time"

	"github.com/go-co-op/gocron/v2"
	"go.uber.org/zap"
)

func New() gocron.Scheduler {
	scheduler, err := gocron.NewScheduler()

	if err != nil {
		panic(err.Error())
	}

	_, err = scheduler.NewJob(gocron.CronJob("* * * * *", false), gocron.NewTask(func() {
		api.App.Logger.Info("Running cron job", zap.String("fn", "category service count"))
		var result dto.GetCategoriesServiceCountResponse
		res := db.Client.Raw("SELECT category, COUNT(*) FROM services GROUP BY category;").Scan(&result)

		if res.Error != nil {
			api.App.Logger.Error(res.Error.Error())
			return
		}

		err := api.App.Cache.SetObj("category-service-count", &result, time.Hour*12)

		if err != nil {
			api.App.Logger.Error("cron job cache set failed", zap.Error(err))
			return
		}

		api.App.Logger.Info("cron job completed successfully",
			zap.String("fn", "category service count"),
			zap.Time("endTime", time.Now()),
		)
	}))

	if err != nil {
		panic(err.Error())
	}

	return scheduler
}
