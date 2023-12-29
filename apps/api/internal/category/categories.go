package categories

type ServiceCategory struct {
	Category  string               `json:"category"`
	Subcategories []ServiceSubCategory `json:"subcategories"`
}

type ServiceSubCategory struct {
	Id    uint8  `json:"id"`
	Title string `json:"title"`
}

var ServiceCategories []ServiceCategory = []ServiceCategory{
	{
		Category: "Home Services",
		Subcategories: []ServiceSubCategory{
			{Id: 1, Title: "Plumbing"},
			{Id: 2, Title: "Electrical work"},
			{Id: 3, Title: "Painting"},
			{Id: 4, Title: "Cleaning"},
			{Id: 5, Title: "Pest control"},
			{Id: 6, Title: "Landscaping"},
		},
	},
	{
		Category: "Professional Services",
		Subcategories: []ServiceSubCategory{
			{Id: 7, Title: "Legal advice"},
			{Id: 8, Title: "Accounting and financial services"},
			{Id: 9, Title: "Consulting"},
			{Id: 10, Title: "Marketing and advertising"},
			{Id: 11, Title: "Web development and IT services"},
		},
	},
	{
		Category: "Health and Wellness",
		Subcategories: []ServiceSubCategory{
			{Id: 12, Title: "Personal training"},
			{Id: 13, Title: "Nutrition consulting"},
			{Id: 14, Title: "Massage therapy"},
			{Id: 15, Title: "Counselling and therapy"},
			{Id: 16, Title: "Yoga and fitness classes"},
		},
	},
	{
		Category: "Education and Tutoring",
		Subcategories: []ServiceSubCategory{
			{Id: 17, Title: "Academic tutoring"},
			{Id: 18, Title: "Language lessons"},
			{Id: 19, Title: "Music and arts lessons"},
			{Id: 20, Title: "Test Preparation"},
			{Id: 21, Title: "Online courses and workshops"},
		},
	},
	{
		Category: "Events and Entertainment",
		Subcategories: []ServiceSubCategory{
			{Id: 22, Title: "Event planning and coordination"},
			{Id: 23, Title: "Photography and Videography"},
			{Id: 24, Title: "DJ and music services"},
			{Id: 25, Title: "Catering and food services"},
			{Id: 26, Title: "Venue booking"},
		},
	},
	{
		Category: "Automotive Services",
		Subcategories: []ServiceSubCategory{
			{Id: 27, Title: "Auto repair and maintenance"},
			{Id: 28, Title: "Car detailing"},
			{Id: 29, Title: "Towing and roadside assistance"},
			{Id: 30, Title: "Vehicle inspection"},
		},
	},
	{
		Category: "Beauty and Personal Care",
		Subcategories: []ServiceSubCategory{
			{Id: 31, Title: "Hairdressing and styling"},
			{Id: 32, Title: "Makeup and beauty services"},
			{Id: 33, Title: "Spa and wellness treatments"},
			{Id: 34, Title: "Nail care"},
		},
	},
	{
		Category: "Real Estate and Property Services",
		Subcategories: []ServiceSubCategory{
			{Id: 35, Title: "Property management"},
			{Id: 36, Title: "Home inspection"},
			{Id: 37, Title: "Real estate brokerage"},
			{Id: 38, Title: "Rental and leasing services"},
		},
	},
	{
		Category: "Technology and Digital Services",
		Subcategories: []ServiceSubCategory{
			{Id: 39, Title: "Software development"},
			{Id: 40, Title: "Graphic design"},
			{Id: 41, Title: "Digital Marketing"},
			{Id: 42, Title: "Social media management"},
		},
	},
	{
		Category: "Retail and Shopping Services",
		Subcategories: []ServiceSubCategory{
			{Id: 43, Title: "Personal shopping"},
			{Id: 44, Title: "Online shopping assistance"},
			{Id: 45, Title: "Product reviews and recommendations"},
		},
	},
}
