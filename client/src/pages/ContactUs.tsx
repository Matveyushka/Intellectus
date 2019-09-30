import * as React from 'react';
export const ContactUs = (): React.ReactElement | null => (
    <>
        <main className="main-container">
            <form className="contact-form">
                <div className="input-field">
                    <label htmlFor="name">Your name:</label>
                    <input type="text" id="name" name="name"/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"/>
                </div>
                <div className="input-field">
                    <label htmlFor="text">Feedback:</label>
                    <div className="input-with-area">
                        <input type="text" placeholder="Title" name="title"/>
                        <textarea id="text" placeholder="Body" name="body"></textarea>
                        <div className="send-form">
                            <div className="area-count">0 / 300</div>
                            <button className="send-btn">
                                <img src="data:image/svg+xml,%3Csvg fill='%2388c8b0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z'/%3E%3C/svg%3E"/>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
        <footer className="footer">
            <p>INTELLECTUS</p>
            <p>BY NOBRAINS</p>
        </footer>
    </>
);
