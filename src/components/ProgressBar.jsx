import React from "react";

const ProgressBar = (props) => {
    const progress = props.responseTime / 1000; // divide by 1000 to convert to seconds
    const style = {
        width: `${progress * 100}%`
    };

    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                        Loading...
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                        {props.responseTime}ms
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div style={style} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
            </div>
        </div>

    );
}

export default ProgressBar;