import { Button } from './components/Button';
import { ThemeProvider } from 'styled-components';

export function App() {
  return (
    <>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
    </>
  );
}
