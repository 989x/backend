# Employee Filtering Function

This document outlines the functionality of the Employee Filtering Function API, which allows users to filter employees based on specified conditions.

## Endpoint

### Base URL
```
GET http://127.0.0.1:3000/api/v1/recludes/monthly-attendance
```

## Usage

### Request

#### Example
```http
GET http://127.0.0.1:3000/api/v1/recludes/monthly-attendance?start_year=2022&end_year=2023&start_month=8&end_month=10
```

#### Parameters
- `start_year`: The start year for filtering (e.g., `2022`)
- `end_year`: The end year for filtering (e.g., `2023`)
- `start_month`: The start month for filtering (e.g., `8` for August)
- `end_month`: The end month for filtering (e.g., `10` for October)

### Response

#### Successful Response (`reclude-1.go`)
```json
{
   "code":200,
   "data":{
      "monthly_counts":{
         "2022-08":27,
         "2022-09":17,
         "2022-10":16,
         "2022-11":21,
         "2022-12":5,
         "2023-01":4,
         "2023-02":19,
         "2023-03":14,
         "2023-04":18,
         "2023-05":23,
         "2023-06":16,
         "2023-07":13,
         "2023-08":10,
         "2023-09":21,
         "2023-10":21
      },
      "total_staffs":245
   },
   "errorMessage":null,
   "result":"Monthly Employee Attendance",
}
```

#### Successful Response (`reclude-2.go`)
```json
{
   "code":200,
   "data":{
      "monthly_counts":{
         "2022-08":27,
         "2022-09":17,
         "2022-10":16,
         "2023-08":10,
         "2023-09":21,
         "2023-10":21
      },
      "total_staffs":112
   },
   "errorMessage":null,
   "result":"Monthly Employee Attendance"
}
```

### Response Structure
- `code`: HTTP status code indicating the success of the request.
- `result`: Indicates the type of data returned.
- `data`: Contains the actual response data.
  - `monthly_counts`: Monthly attendance counts within the specified range.
  - `total_staffs`: Total number of staff members considered in the filtering.
