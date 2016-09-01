# Ember-time-tools

This Ember-cli addon provides date and time related tools for Ember applications.
The primary components consist of a date-picker, time-picker and a calendar.

## Demo

http://lozjackson.github.io/ember-time-tools/

## Installation

* `ember install ember-time-tools`

## Use

## DatePicker

Create a DatePickerComponent using the following example:

```
{{date-picker selectedDate=selectedDate select="select"}}
```

You can use the InputDateComponent to create a html `input` element and a DatePickerComponent in one.

```
{{input-date value=date}}
```

## TimePicker

Create a TimePickerComponent using the following example:

```
{{time-picker selectedTime=selectedTime select="select"}}
```

You can use the InputTimeComponent to create a html `input` element and a TimePickerComponent in one.

```
{{input-time value=time}}
```

## Calendar

You can create a CalendarMonthComponent using the following example:

```
{{calendar-month events=model}}
```

## Compatibility

Ember version ^2.0 is required for this addon to function correctly.  Ember v1.x is not supported.
