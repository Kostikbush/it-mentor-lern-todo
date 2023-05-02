import { SApp, SH1 } from './assets/styles/app.styles';
import { TodosMemo } from './components/Todos.components';

function App() {
    return (
        <SApp>
            <SH1>Todont</SH1>
            <TodosMemo />
        </SApp>
    );
}

export default App;
