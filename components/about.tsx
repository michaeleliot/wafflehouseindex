import React from 'react';
import styles from '../styles/Home.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <div className={"w-full sm:w-1/2"}>
                <h1 className="text-5xl">Waffle House Index</h1>
                <p className="text-2xl">
                    The Waffle House index is used to determine the effects of storm damage in the southeast.
                    The Waffle House is notorious for staying open in spite of any weather, so the state of
                    a given waffle house, such as what menu items are available, can become a source of ground data for disaster relief.
                    Plus, there are a lot of waffle houses, so you can easily tell exactly where major damage is.
                        You can read more on <a className={"text-teal-300 underline"} href="https://en.wikipedia.org/wiki/Waffle_House_Index">wikipedia</a>.
                    </p>
                <h1 className="text-5xl">About the Author</h1>
                <p className="text-2xl">
                    My name is Michael Eliot, a solutions engineer in the bay area. You can follow me on {' '}
                    <a className={"text-teal-300 underline"} href="https://twitter.com/MichaelEliot">Twitter</a>,{' '}
                    <a className={"text-teal-300 underline"} href="https://github.com/michaeleliot">Github</a>, {' '}
                        or <a className={"text-teal-300 underline"} href="https://github.com/michaeleliot">Linkedin</a>.
                </p>
            </div>
        </div>
    );
}

