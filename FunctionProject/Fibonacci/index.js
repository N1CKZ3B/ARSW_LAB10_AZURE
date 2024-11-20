/*
var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        for (var i = 0; i < nth - 1; i++) {
            answer = nth_2.add(nth_1)
            nth_2 = nth_1
            nth_1 = answer
        }
    }

    context.res = {
        body: answer.toString()
    };
}
*/

var bigInt = require("big-integer");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth;

    if (nth < 0) {
        throw 'El valor de "nth" debe ser un número entero no negativo.';
    }

    var memo = {};

    function fibonacci(n) {
        if (n === 0) {
            return bigInt.zero;
        } else if (n === 1) {
            return bigInt.one;
        } else if (memo[n]) {
            return memo[n];
        } else {
            return (memo[n] = fibonacciHelper(n));
        }
    }

    function fibonacciHelper(n) {
        let a = bigInt.zero;
        let b = bigInt.one;

        for (let i = 0; i < n - 1; i++) {
            let temp = a;
            a = b;
            b = temp.add(b);
        }

        return a;
    }

    try {
        let answer = fibonacci(nth);

        context.res = {
            body: answer.toString()
        };
    } catch (error) {
        context.log.error(error);
        context.res = {
            status: 500,
            body: "Error en la ejecución de la función."
        };
    }
};