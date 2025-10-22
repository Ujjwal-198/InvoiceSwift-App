import React from 'react';
import { useState, useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";
const Popup = () => {

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const isPopupShown = localStorage.getItem('popupShown');
        if (!isPopupShown) {
            setShowPopup(true);
            localStorage.setItem('popupShown', 'true');
        }
    }, []);

    if (!showPopup) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 text-black rounded-lg p-8 shadow-xl max-w-md text-center relative">

                <button
                    className="absolute top-3 right-3 text-gray-900 hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowPopup(false)}
                >
                    <RxCross1 />
                </button>

                <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
                <p className="text-gray-900 mb-6">
                    This is a <span className="font-semibold">showcase/hobby project</span>.
                    You can use dummy email and password credentials to explore the features.
                    No real accounts are needed.
                </p>

                <button
                    onClick={() => setShowPopup(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                >
                    Got it
                </button>
            </div>
        </div>
    );
}

export default Popup;
