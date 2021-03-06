import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component{
	state = {
		value: null,
		displayValue: '0',
		waitingForOperand: false,
		operator: null
	}
	
	clearDisplay(){
		this.setState({
			displayValue : '0',
			value: null
		})
	}
	inputDigit(digit){
			const { displayValue, waitingForOperand } = this.state
				if(waitingForOperand){
					this.setState({
						displayValue: String(digit),
						waitingForOperand: false
					})
				}
				else if(displayValue.length <8){
					this.setState({
						displayValue: displayValue === '0' ? String(digit): displayValue + digit
					})
				}
			
	}
	inputDot(){
		const { displayValue, waitingForOperand } = this.state
		
		if(waitingForOperand){
			this.setState({
				displayValue : '.',
			})
		}
		else if(displayValue.indexOf('.') === -1){
			this.setState({
				displayValue : displayValue + '.',
				waitingForOperand: false
			})
		}
	}
	toggleSign(){
		const { displayValue } = this.state
		
		this.setState({
			displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1): '-'+displayValue
		})
		
	}
	inputPercent(){
		const {displayValue} = this.state
		const value = parseFloat(displayValue)
		
		this.setState({
			displayValue: String(value/100)
		})
	}
	
	performOperation(nextOperator){
		const { displayValue, operator, value } = this.state	

		const nextValue = parseFloat(displayValue)
		
		const operations = {
			'/': (preValue, nextValue) => preValue / nextValue,
			'*': (preValue, nextValue) => preValue * nextValue,
			'-': (preValue, nextValue) => preValue - nextValue,
			'+': (preValue, nextValue) => preValue + nextValue,
			'=': (preValue, nextValue) => nextValue
		}
		if(value == null){
			this.setState({
				value: nextValue
			})
		}
		else if(operator){
			const currentValue = value || 0
			const computedValue = operations[operator](currentValue, nextValue)
			
			const stringComputedValue = String(computedValue);
			if(stringComputedValue.length < 8){
				this.setState({
					value: computedValue,
					displayValue: stringComputedValue
				})
			}
			else{
				this.setState({
				value: null,
				displayValue: '0'
				})
			}
		}
		
		this.setState({
			waitingForOperand: true,
			operator: nextOperator
		})
	}
	
	render(){
		const { displayValue } = this.state
		
		return (
			<div className="calculator">
			<pre>{
				//JSON.stringify(this.state, null, 2)
				}
			</pre>
				<div className="calculator-display">
				{displayValue}
				</div>
				<div className="calculator-keyboard">
					<div className="input-keys">
					
						<div className = "function-keys">
							<button className = "calculator-key key-clear" onClick={()=>this.clearDisplay()}>AC</button>
							<button className = "calculator-key key-sign" onClick={()=>this.toggleSign()}>+/-</button>
							<button className = "calculator-key key-percent" onClick={()=>this.inputPercent()}>%</button>
							<button className = "calculator-key operator-keys key-divide" onClick={()=>this.performOperation('/')}>/</button>
						</div>
						
						<div className = "digit-keys">
							<button className = "calculator-key key-7" onClick={()=>this.inputDigit(7)}>7</button>
							<button className = "calculator-key key-8" onClick={()=>this.inputDigit(8)}>8</button>
							<button className = "calculator-key key-9" onClick={()=>this.inputDigit(9)}>9</button>
							<button className = "calculator-key operator-keys key-multiply" onClick={()=>this.performOperation('*')}>*</button>
							<br />
							<button className = "calculator-key key-4" onClick={()=>this.inputDigit(4)}>4</button>
							<button className = "calculator-key key-5" onClick={()=>this.inputDigit(5)}>5</button>
							<button className = "calculator-key key-6" onClick={()=>this.inputDigit(6)}>6</button>
							<button className = "calculator-key operator-keys key-subtract" onClick={()=>this.performOperation('-')}>-</button>
							<br />
							<button className = "calculator-key key-1" onClick={()=>this.inputDigit(1)}>1</button>
							<button className = "calculator-key key-2" onClick={()=>this.inputDigit(2)}>2</button>
							<button className = "calculator-key key-3" onClick={()=>this.inputDigit(3)}>3</button>
							<button className = "calculator-key operator-keys key-add" onClick={()=>this.performOperation('+')}>+</button>
							<br />
							<button className = "calculator-key key-0" onClick={()=>this.inputDigit(0)}>0</button>
							<button className = "calculator-key key-dot" onClick={()=>this.inputDot()}>.</button>
							<button className = "calculator-key operator-keys key-equals" onClick={()=>this.performOperation('=')}>=</button>
							</div>						
					</div>	
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
