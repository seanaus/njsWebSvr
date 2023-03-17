// module.exports.register = function (Handlebars) {
//     Handlebars.registerHelper('ternary', function (test, yes, no) {
//         return test ? yes : no;
//     });
// };
// // Handlebars => {
// //     Handlebars.registerHelper('ternary', (test, yes, no)=> {
// //         return test ? yes : no;
// //     });
// // };
// // module.exports = {
// //     register
// // }
Handlebars.registerHelper('ifItemSelected', (item, options)=> {
    var selected = false;
    // lots of logic that determines if item is selected

    if (selected) {
        return options.fn(this);
    }
});
