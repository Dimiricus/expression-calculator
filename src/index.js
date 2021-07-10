function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here

    //expr = expr.replace(/\s/g, '');

    let lastOpen;                               // индекс последней открывающей скобочки
    let firstClose;                             // индекс первой закрывающей скобочки
    let privateSolution;                        // выражение внутри скобок
    let deletSubstring;                         // удаляемое выражение
    let intermediateResult = 0;                 // промежуточный результат
    let result;

    while (expr.length != 1) {

        

        // если скобочки есть
        if ( expr.includes('(') == true || expr.includes(')') == true) {

            // проверим скобки на парность
            if ( expr.split('(').length - 1 != expr.split(')').length - 1 ) {
                throw("ExpressionError: Brackets must be paired");
            }

            lastOpen = expr.lastIndexOf('(');       // индекс последней открывающей скобочки
            
            firstClose = expr.indexOf(')', lastOpen);         // индекс первой закрывающей скобочки

            deletSubstring = expr.substring(lastOpen, firstClose + 1);      // удаляемая подстрока со скобками
            
            privateSolution = expr.substring(lastOpen + 1, firstClose);     // выражение внутри скобок

            privateSolution = privateSolution.split(' ');                   // преобразуем строку в массив по пробелу
        
            // удалим из массива все пробелы
            for (let i = 0; i < privateSolution.length; i++) {

                if (privateSolution[i] === "" && privateSolution[i] !== 0) {
                privateSolution.splice(i, 1);
                i = i - 1;
                }
            }

            // распарсим выражение-массив внутри скобок
            for (let i = 0; i < privateSolution.length; i++) {
                
                if ( privateSolution.includes('*') == true || privateSolution.includes('/') == true ) {

                    if (privateSolution[i] == '*') {

                        intermediateResult += privateSolution[i - 1] * privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    } 

                    if (privateSolution[i] == '/') {

                        // деление на 0
                        if ( privateSolution[i - 1] / privateSolution[i + 1] == Infinity ) {
                            throw("TypeError: Division by zero.");
                        }

                        intermediateResult += privateSolution[i - 1] / privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }
                } else {

                    if (privateSolution[i] == '+') {

                        intermediateResult += (+privateSolution[i - 1]) + (+privateSolution[i + 1]);
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }

                    if (privateSolution[i] == '-') {

                        intermediateResult += privateSolution[i - 1] - privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }
                }
            }
            
            expr = expr.replace(deletSubstring, privateSolution);        // удалим первые по приоритету скобки из строки и заменим их на результат внутри этих скобок
        
        } else {
            

            if (expr.includes(' ') == true) {
                privateSolution = expr.split(' ');                   // преобразуем строку в массив по пробелу

                // удалим из массива все пробелы
                for (let i = 0; i < privateSolution.length; i++) {

                    if (privateSolution[i] === "" && privateSolution[i] !== 0) {
                    privateSolution.splice(i, 1);
                    i = i - 1;
                    }
                }
            } else {
                privateSolution = expr.split('');
            }
            
            // распарсим выражение-массив внутри скобок
            for (let i = 0; i < privateSolution.length; i++) {
                
                if ( privateSolution.includes('*') == true || privateSolution.includes('/') == true ) {

                    if (privateSolution[i] == '*') {

                        intermediateResult += privateSolution[i - 1] * privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    } 

                    if (privateSolution[i] == '/') {

                        // деление на 0
                        if ( privateSolution[i - 1] / privateSolution[i + 1] == Infinity ) {
                            throw("TypeError: Division by zero.");
                        }

                        intermediateResult += privateSolution[i - 1] / privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }
                } else {

                    if (privateSolution[i] == '+') {

                        intermediateResult += (+privateSolution[i - 1]) + (+privateSolution[i + 1]);
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }

                    if (privateSolution[i] == '-') {

                        intermediateResult += privateSolution[i - 1] - privateSolution[i + 1];
                        privateSolution.splice(i - 1, 3, intermediateResult);
                        intermediateResult = 0;
                        i = 0;
                    }
                }
            }

            expr = privateSolution;

            if ( Number.isInteger(expr[0]) == true ) {

                result = expr[0];

            } else if ( ( (expr[0].toString().includes('.')) ? (expr[0].toString().split('.').pop().length) : (0) ) <= 4 ) {

                result = expr[0];

            } else if ( ( (expr[0].toString().includes('.')) ? (expr[0].toString().split('.').pop().length) : (0) ) > 4 ) {

                result = +(parseFloat(expr[0]).toFixed(4));
            }
            
            return result;
        }
    }
}

module.exports = {
    expressionCalculator
}