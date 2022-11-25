export default async () => {
  const date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var currentDate = `${day}-${month}-${year}`;
  return currentDate;
}