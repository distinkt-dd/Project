import { SecondPage } from '@pages/second';
import './styles/index.css';
import { MainPage } from '@pages/main';
import './App.css';
// import { Toggler } from '@shared/ui/toggler/Toggler';
// import { useState } from 'react';
export function App() {
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  // const [isThemeChecked, setIsThemeChecked] = useState(false);
  // const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  return (
    <div className="bg-amber-900 text-center">
      <MainPage />
      <h1>Hello World</h1>
      {/* Примеры использования Toggler */}
      {/* <Toggler
        type='checkbox' // Необязательно, checkbox стоит по умолчанию
        checked={isCheckboxChecked}
        onChange={setIsCheckboxChecked}
      />
      <Toggler
        type='switch'
        checked={isSwitchChecked}
        onChange={setIsSwitchChecked}
      />
      <Toggler
        type='theme'
        checked={isThemeChecked}
        onChange={setIsThemeChecked}
      /> */}
      <SecondPage />
    </div>
  );
}
