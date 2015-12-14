var onSelect = function(date) {
  console.log(date);
};

var DateTimeInputInstance = (
  <div>
    <DateTimeInput onSelect={onSelect} />
    <DateTimeInput dateTime="2015-05-20 12:12" />
  </div>
);

ReactDOM.render(DateTimeInputInstance, mountNode);
