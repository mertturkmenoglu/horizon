package lists

import "testing"

func TestTableUserAllowedToCreateLists(t *testing.T) {
	tests := []struct {
		Name     string
		Count    int
		Expected bool
	}{
		{
			Name:     "Zero",
			Count:    0,
			Expected: true,
		},
		{
			Name:     "Less than max",
			Count:    1,
			Expected: true,
		},
		{
			Name:     "Equal to max",
			Count:    MaxListPerUser,
			Expected: false,
		},
		{
			Name:     "Greater than max",
			Count:    MaxListPerUser + 1,
			Expected: false,
		},
	}

	for _, test := range tests {
		actual := isUserAllowedToCreateList(test.Count)

		t.Run(test.Name, func(t *testing.T) {
			if actual != test.Expected {
				t.Errorf("Expected %v, got %v", test.Expected, actual)
			}
		})
	}
}

func TestTableUserAllowedToCreateListItems(t *testing.T) {
	tests := []struct {
		Name     string
		Count    int
		Expected bool
	}{
		{
			Name:     "Zero",
			Count:    0,
			Expected: true,
		},
		{
			Name:     "Less than max",
			Count:    1,
			Expected: true,
		},
		{
			Name:     "Equal to max",
			Count:    MaxListItemCount,
			Expected: false,
		},
		{
			Name:     "Greater than max",
			Count:    MaxListItemCount + 1,
			Expected: false,
		},
	}

	for _, test := range tests {
		actual := isUserAllowedToCreateListItem(test.Count)

		t.Run(test.Name, func(t *testing.T) {
			if actual != test.Expected {
				t.Errorf("Expected %v, got %v", test.Expected, actual)
			}
		})
	}
}
