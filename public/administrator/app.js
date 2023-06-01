angular.module('MyApp', ['appRoutes', 'MainController', 'authService', 'home', 'login', 'logout', '720kb.datepicker', 'calendar', 'add', 'issue_details', 'issuedetails', 'issue_edit', 'user', 'report_today', 'excelx', 'report_today_data', 'mwl.calendar', 'ui.bootstrap', 'mwl.calendar', 'ngAnimate', 'colorpicker.module','mwl.calendar.docs','search_result','issuedetails00','reports0']).config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }).config(['$provide', Decorate]).config(['calendarConfig', function (calendarConfig) {
        // View all available config
        console.log(calendarConfig);
        // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
        calendarConfig.dateFormatter = 'moment';
        // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
        calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
        // This will configure the day view title to be shorter
        calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
        // This will set the week number hover label on the month view
        calendarConfig.i18nStrings.weekNumber = 'Week {week}';
        // This will display all events on a month view even if they're not in the current month. Default false.
        calendarConfig.displayAllMonthEvents = false;
        // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
        calendarConfig.showTimesOnWeekView = true;
  }])
    ////////////////////
    
function Decorate($provide) {
    $provide.decorator('$locale', function ($delegate) {
        var value = $delegate.DATETIME_FORMATS;
        value.SHORTDAY = [
        "الاحد"
        , "الاثنين"
        , "الثلاثاء"
        , "الاربعاء"
        , "الخميس"
        , "الجمعه"
        , "السبت"
    ];
        return $delegate;
    });
};