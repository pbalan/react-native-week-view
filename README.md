# react-native-week-view

![weekView](images/gif.gif)
## Props
* **`events`** _(Array)_ - Events to display
* **`onEventPress`** _(Function)_ - Callback when event item is clicked
* **`numberOfDays`** _(Number)_ - Set number of days to show in view, can be `1`, `3`, `7`.
* **`dateHeaderFormat`** _(String)_ - Format for dates of header, default is `MMM D`
* **`selectedDate`** _(Date)_ - Intial date to show week/days in view
* **`onSwipeNext`** _(Function)_ - Callback when calendar is swiped to next week/days
* **`onSwipePrev`** _(Function)_ - Callback when calendar is swiped to previous week/days
* **`locale`** _(String)_ - locale for the header, there's a `addLocale` function to add cusomized locale. Default is `en`.
## Event Object
```
{
  id: 1,
  description: 'Event',
  startDate: new Date(),
  endDate: new Date(),
  color: 'blue',
}
```
## Locales customization
There's a `addLocale` function to add customized locale for component. This component depends on `momentjs`, we can refer to https://momentjs.com/docs/#/customization/ for more information.
For example, if you want to include Simplified Chinese, you can import Chinese locale from `momentjs` in your main app.

```
import 'moment/locale/zh-cn';
```

Example:
```
export WeekView, { addLocale } from 'react-native-week-view';
// add customized localed before using locale prop.
addLocale('fr', {
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
});
```

## Styling

headerStyle: Applies to all column headers.
currentDayStyle: Applies to currentDay header.

## Usage:

```
import React from 'react';
import {SafeAreaView, StyleSheet, View, Alert, Text} from 'react-native';
import WeekView from 'react-native-week-view';
import {i18n} from '../helpers/translate';

const events_data = [
  {
    id: 1,
    description: 'Event',
    startDate: new Date(),
    endDate: new Date(),
    color: 'blue',
  },
];

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.numOfDays = 3;
    this.selectedDate = new Date();
    this.formatWeekDay = 'ddd';
    this.formatDateHeader = 'MMM D';
    this.monthYearFormat = 'MMMM YYYY';
    if (i18n.locale === 'zh') {
      this.locale = 'zh-cn';
      this.formatWeekDay = 'ddd';
      this.formatDateHeader = 'MMMDo';
      this.monthYearFormat = 'MMMMYYYY';
    } else {
      this.locale = i18n.locale;
    }
  }

  scrollViewRef = ref => {
    this.timetableRef = ref;
  };

  onEventPress = evt => {
    Alert.alert('onEventPress', JSON.stringify(evt));
  };

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <WeekView
            scrollViewRef={this.scrollViewRef}
            events={events_data}
            beginTime={0}
            endTime={48}
            selectedDate={this.selectedDate}
            numberOfDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            currentDayStyle={styles.currentDayStyle}
            formatWeekDay={this.formatWeekDay}
            formatDateHeader={this.formatDateHeader}
            monthYearFormat={this.monthYearFormat}
            locale={this.locale}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#81E1B8',
  },
  currentDayStyle: {
    backgroundColor: '#71C158',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default Schedule;
```

## TODO
- [x] allow to swipe between weeks or days.
- [ ] header should be swipeable with columns.
- [ ] allow to drag drop events to specific time and date.
- [ ] update example for more cases (1 day, 7 days).
- [ ] update document.
