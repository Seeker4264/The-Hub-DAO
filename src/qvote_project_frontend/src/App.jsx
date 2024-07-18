import { useState } from 'react';
import { qvote_project_backend } from 'declarations/qvote_project_backend';

import NavBar from './components/NavBar.jsx';

function App() {
    const [greeting, setGreeting] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        qvote_project_backend.greet(name).then((greeting) => {
        setGreeting(greeting);
        });
        return false;
    }

    return (
        <>
            <NavBar />
        </>
    );
}

export default App;

/*
<main>
<img src="/logo2.svg" alt="DFINITY logo" />
<br />
<br />
<form action="#" onSubmit={handleSubmit}>
    <label htmlFor="name">Enter your name: &nbsp;</label>
    <input id="name" alt="Name" type="text" />
    <button type="submit">Click Me!</button>
</form>
<section id="greeting">{greeting}</section>
</main>
*/
