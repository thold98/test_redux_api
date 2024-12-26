import TodoList from './components/TodoList';
import ValidatedInput from './components/ValidatedInput';
import Test2 from './components/Test2';

const App: React.FC = () => {
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <>
      {/* <ValidatedInput
        validationFn={validateEmail}
        errorMessage="Please enter a valid email address."
      />
      <TodoList /> */}
      <Test2 />
    </>
  )
}

export default App
