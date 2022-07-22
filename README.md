# Clipboard

Stack
1. Node.js
2. Typescript.
3. Redis.

Run APP

```docker-compose up -d```

Run TEST

```yarn test```

APIS

``` POST:/auth/login @BODY username=admin&password=adminpassword - User authentication ```

``` POST:/employee/salary @BODY name,salary,current,department,sub_department,on_contract - Create new data to dataset ```

``` DELETE:/employee/salary @BODY name - Delete data by name ```

``` GET:/employee/statistics - Get SS```

``` GET:/employee/statistics/contracted -- Get SS on_contract is true```

``` GET:/employee/statistics/department -- Get ss by departments ```

``` GET:/employee/statistics/subdepartment -- Get ss by departments and subdepartments ```
