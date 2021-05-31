// Your code here

const createEmployeeRecord = employeeInfo => {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

const createEmployeeRecords = records => {
    return records.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = (employee, dateStamp) => {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    })
    return employee

}

const createTimeOutEvent = (employee, dateStamp) => {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const timeIn = employee.timeInEvents.find(record => record.date == date).hour
    const timeOut = employee.timeOutEvents.find(record => record.date == date).hour
    return (timeOut - timeIn) / 100
}

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

const allWagesFor = employee => {
    const dates = employee.timeOutEvents.map(timeEvent => timeEvent.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date),0);
}

const calculatePayroll = employees => {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(record => record.firstName === firstName)
}