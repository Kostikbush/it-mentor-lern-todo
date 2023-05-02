import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background-color: #282a36;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  p {
    margin: 0;
  }
  .changeScele-enter {
  opacity: 0;
}

.changeScele-enter-active {
  opacity: 1;
  transition: opacity 300ms, transform 300ms;
}

.changeScele-exit {
  opacity: 1;
}

.changeScele-exit-active {
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
}
.todo-list {
  max-width: 550px;
}
`;
