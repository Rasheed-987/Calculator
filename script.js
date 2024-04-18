let displayValue = '';
        let expression = '';

        function appendtoDisplay(value) {
            // Append the value to the existing displayValue and expression
            displayValue += value;
            expression += value;
           console.log(displayValue)
          //  console.log(expression)
            updateDisplay();
       
          }

        function updateDisplay() {
            let display = document.querySelector('.display');
              display.innerHTML=displayValue;
                 


              
            
        }

        function calculate() {
            try {
                // Parse the expression and calculate the result
                let result = evaluateExpression(expression);
                // Update the display with the result
                displayValue = result.toString();
                 expression = result.toString();
                updateDisplay();
            } catch (error) {
                displayValue = 'Error';
                updateDisplay();
            }
        }

        function clearDisplay() {
            displayValue = '';
            expression = '';
          console.log(displayValue);
            updateDisplay();
        }

        function evaluateExpression(exp) {
            // Use regular expression to replace multiple operators with a single one
            exp = exp.replace(/([+\-*\/])+/g, '$1');

            // Use regex to split the expression into numbers and operators
            let tokens = exp.match(/(\d+(\.\d+)?|[+\-*\/])/g);
            console.log(tokens);
            // Check for invalid expressions
            if (!tokens || tokens.length < 3 || tokens.length % 2 === 0) {
                throw new Error('Invalid expression');
            }

            // Evaluate the expression with proper order of operations
            const operators = ['*', '/', '+', '-'];
            for (let op of operators) {
                while (tokens.indexOf(op) !== -1) {
                    let index = tokens.indexOf(op);
                    let leftOperand = parseFloat(tokens[index - 1]);
                    let rightOperand = parseFloat(tokens[index + 1]);
                    let result;
                    switch (op) {
                        case '*':
                            result = leftOperand * rightOperand;
                            break;
                        case '/':
                            if (rightOperand === 0) {
                                throw new Error('Division by zero');
                            }
                            result = leftOperand / rightOperand;
                            break;
                        case '+':
                            result = leftOperand + rightOperand;
                            break;
                        case '-':
                            result = leftOperand - rightOperand;
                            break;
                    }
                    // Replace the evaluated expression with the result
                    tokens.splice(index - 1, 3, result.toString());
                }
            }
            return parseFloat(tokens[0]);
        }  
