$.ajax({
    type: 'post',
    url: "/api/blog/account/login",
    data: {
        user_name: 'ahj',
        password: '111111'
    },
    // dataType: 'json',
    context: document.body,
    // contentType: 'application/json; charset=UTF-8',
    timeout: '100000',
    success: function (data) {
        console.log(data);
    },
    error: function(error) {
        console.log(error);
    }
});
// $.ajax({
//     type: 'post',
//     url: "/api/blog/account/register",
//     data: {
//         user_name: 'zx',
//         password: '111111',
//     },
//     // dataType: 'json',
//     context: document.body,
//     // contentType: 'application/json; charset=UTF-8',
//     timeout: '100000',
//     success: function (data) {
//         console.log(data);
//     },
//     error: function (error) {
//         console.log(error);
//     }
// });