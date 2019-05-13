# Simple pagination of a Javascript collection

A Javascript **class** to provide simple pagination to an array collection with a custom template callback function to render the current pagination page without the need of any external libraries.

##### Usage
Create javascript object based on the Pagination class and pass the require parameters.

```javascript
var p = new Pagination({
    element:"my_table",
    data:array_data,
    pageSize:10,
    template: function(data){
      // Access to current page pagination data
    }
  });      
```