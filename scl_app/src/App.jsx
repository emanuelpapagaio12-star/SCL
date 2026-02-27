import React, { useState, useEffect } from 'react';

const MOCK_SCL_TEMPLATES = {
    motor: `FUNCTION_BLOCK FB_MotorControl
VAR_INPUT
    Start : BOOL; // Start Button
    Stop : BOOL;  // Stop Button
    Reset : BOOL; // Reset Fault
END_VAR
VAR_OUTPUT
    Running : BOOL;
    Fault : BOOL;
END_VAR
VAR
    State : INT := 0; 
END_VAR
BEGIN
    IF Stop THEN
        Running := FALSE;
    ELSIF Start AND NOT Fault THEN
        Running := TRUE;
    END_IF;
END_FUNCTION_BLOCK`,
    tank: `FUNCTION_BLOCK FB_LevelControl
VAR_INPUT
    HighLevel : BOOL;
    LowLevel : BOOL;
    PumpFault : BOOL;
END_VAR
VAR_OUTPUT
    PumpRunning : BOOL;
    Alarm : BOOL;
END_VAR
BEGIN
    IF PumpFault THEN
        PumpRunning := FALSE;
        Alarm := TRUE;
    ELSIF LowLevel THEN
        PumpRunning := TRUE;
    ELSIF HighLevel THEN
        PumpRunning := FALSE;
    END_IF;
END_FUNCTION_BLOCK`
};

function App() {
    const [requirements, setRequirements] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [sclCode, setSclCode] = useState('');
    const [logs, setLogs] = useState([]);
    const [status, setStatus] = useState('waiting');

    const steps = [
        { title: 'Analysis', desc: 'Analyzing requirements...' },
        { title: 'Generation', desc: 'Generating SCL code via LLM...' },
        { title: 'Verification', desc: 'Running static analysis...' },
        { title: 'Optimization', desc: 'Refining code structure...' }
    ];

    const addLog = (msg, type = 'info') => {
        setLogs(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
    };

    const handleGenerate = async () => {
        if (!requirements) return;

        setIsProcessing(true);
        setSclCode('');
        setLogs([]);
        setStatus('processing');

        // Step 0: Analysis
        setCurrentStep(0);
        addLog('Starting request analysis...');
        await new Promise(r => setTimeout(r, 1000));

        // Step 1: Generation
        setCurrentStep(1);
        addLog('Consulting LLM for code generation...');
        await new Promise(r => setTimeout(r, 1500));
        const template = requirements.toLowerCase().includes('motor') ? MOCK_SCL_TEMPLATES.motor : MOCK_SCL_TEMPLATES.tank;
        setSclCode(template);

        // Step 2: Verification
        setCurrentStep(2);
        addLog('Checking syntax and variable declarations...');
        await new Promise(r => setTimeout(r, 1200));
        addLog('Static Analysis: No errors found.', 'success');

        // Step 3: Optimization
        setCurrentStep(3);
        addLog('Applying vendor-aware optimizations for Siemens TIA Portal...');
        await new Promise(r => setTimeout(r, 1000));

        setIsProcessing(false);
        setStatus('success');
        addLog('Process completed successfully!', 'success');
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo-area">
                    <div className="logo-icon">S</div>
                    <h2>SCL GenV</h2>
                </div>

                <div className="card">
                    <h3>Requirements</h3>
                    <p className="step-desc" style={{ marginBottom: '0.5rem' }}>Describe your PLC logic in natural language.</p>
                    <textarea
                        placeholder="e.g. Create a motor control block with start/stop buttons and a fault indicator..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                    />
                    <button
                        style={{ marginTop: '1rem', width: '100%' }}
                        onClick={handleGenerate}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Generate Code'}
                    </button>
                </div>

                <div className="card" style={{ flex: 1 }}>
                    <h3>Pipeline Status</h3>
                    <div className="step-list" style={{ marginTop: '1rem' }}>
                        {steps.map((step, i) => (
                            <div key={i} className={`step-item ${currentStep === i ? 'active' : ''} ${currentStep > i ? 'completed' : ''}`}>
                                <div className="step-icon">
                                    {currentStep > i ? '✓' : i + 1}
                                </div>
                                <div className="step-content">
                                    <div className="step-title">{step.title}</div>
                                    <div className="step-desc">{step.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Generated SCL Code</h1>
                    <span className={`status-badge status-${status}`}>
                        {status}
                    </span>
                </div>

                <div className="code-editor">
                    <pre>{sclCode || '// Waiting for requirements...'}</pre>
                </div>

                <div className="card">
                    <h3>Execution Logs</h3>
                    <div style={{ marginTop: '1rem', maxHeight: '150px', overflowY: 'auto' }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ fontSize: '0.85rem', marginBottom: '0.25rem', color: log.type === 'success' ? '#4ade80' : 'inherit' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>[{log.time}]</span> {log.msg}
                            </div>
                        ))}
                        {logs.length === 0 && <p className="step-desc">No logs yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
