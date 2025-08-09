import React, { useState } from "react";
import { Link } from "react-router"; // Use react-router-dom for Link
import { Settings, X } from "lucide-react"; // Import a settings icon and a close icon

const LevelPage = () => {
    // Hardcoded test data, representing your steps
    const tests = [
        { id: 'step1', name: 'Step 1: A1 & A2', description: 'Total 44 questions, 44 minutes', unlocked: true },
        { id: 'step2', name: 'Step 2: B1 & B2', description: 'Complete Step 1 to unlock', unlocked: false },
    ];

    // State to manage the open modal and the custom timer settings
    const [openSettingsFor, setOpenSettingsFor] = useState(null);
    const [timerSettings, setTimerSettings] = useState({
        step1: 60, // Default 60 seconds per question
        step2: 60,
    });

    const handleTimerChange = (testId, value) => {
        setTimerSettings(prev => ({
            ...prev,
            [testId]: parseInt(value, 10)
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-extrabold mb-12 text-center tracking-wide">
                Choose Your Assessment
            </h1>
            <div className="max-w-md mx-auto space-y-6 w-full">
                {tests.map(test => (
                    <div
                        key={test.id}
                        className={`relative group ${!test.unlocked && 'cursor-not-allowed'}`}
                    >
                        <Link
                            to={test.unlocked ? `/quiz/${test.id}?timer=${timerSettings[test.id]}` : '#'}
                            className={`
                                no-underline w-full block
                                bg-gray-800 rounded-xl shadow-lg p-6
                                transform transition-transform duration-300
                                border border-gray-700
                                ${test.unlocked
                                    ? 'hover:scale-[1.02] hover:bg-gradient-to-br from-purple-500 to-indigo-600'
                                    : 'opacity-50 pointer-events-none'
                                }
                            `}
                        >
                            <h2 className="text-2xl font-bold">{test.name}</h2>
                            <p className="text-sm text-gray-300 mt-2">{test.description}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Timer: {timerSettings[test.id] || 60} seconds per question
                            </p>
                        </Link>

                        {/* Settings button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent link from navigating
                                e.stopPropagation(); // Stop event from bubbling to parent link
                                setOpenSettingsFor(openSettingsFor === test.id ? null : test.id);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <Settings size={20} />
                        </button>
                        
                        {/* Settings Modal (Popover) */}
                        {openSettingsFor === test.id && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                            bg-gray-700 p-4 rounded-lg shadow-xl border border-gray-600
                                            z-10 w-full max-w-sm"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">Timer Settings</h3>
                                    <button onClick={() => setOpenSettingsFor(null)} className="text-gray-400 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                                <label className="block mb-2 text-sm text-gray-300">
                                    Time per question (seconds):
                                </label>
                                <input
                                    type="number"
                                    value={timerSettings[test.id]}
                                    onChange={(e) => handleTimerChange(test.id, e.target.value)}
                                    min="10" // Minimum timer value to prevent issues
                                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                                />
                                <p className="text-xs text-gray-400 mt-2">
                                    Total Time: {Math.round((timerSettings[test.id] * 44) / 60)} minutes
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelPage;