import Budget from './component/Budget';
import BudgetContext from './context/BudgetContext';
import './App.css'

function App() {
  return (
    <div className="App">
      <BudgetContext>
        <Budget/>
      </BudgetContext>
    </div>
  );
}

export default App;
