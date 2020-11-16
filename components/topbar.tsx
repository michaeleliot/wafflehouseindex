import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
export default function TopBar({ set }) {
    return (
        <div className={"flex sm:justify-end gap-5 justify-between m-5"}>
            <button onClick={event => set("Home")} className="bg-transparent text-white-700 font-semibold py-2 px-4 border border-white-500  rounded">
                Map
            </button>
            {' '}
            <button
                onClick={event => set("About")}
                className="bg-transparent text-white-700 font-semibold py-2 px-4 border border-white-500  rounded">
                About
            </button>
        </div>
    );
}
