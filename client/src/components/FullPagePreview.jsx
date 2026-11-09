import React, { useMemo, useState } from 'react'
import { detectDependencies } from '../utils/sandpackUtils';
import SandpackErrorMonitor from './SandpackErrorMonitor';
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';

export default function FullPagePreview({files}) {

    const [showErrorOverlay, setShowErrorOverlay] = useState(true)
    // Convert liveFiles to Sandpack format 
        const sandPackFiles = useMemo(()=> {
            if(!files) return {};
            const spFiles = {}
            for(const [path, content] of Object.entries(files)){
                spFiles[path] = { code: content,  }
            }
            return spFiles;
        }, [files]) 
        
        //Detect depandencies from import statments using liveFIles
        const dependencies = useMemo(()=>{
            if(!files) return {};
            return detectDependencies(files)
        },[files])
  return (
    <div className='h-screen bg-white w-screen overflow-hidden'>
            <SandpackProvider key={files._id} template='react' 
            files={sandPackFiles}
            customSetup={{dependencies}}
            options={{
                externalResources: [
                    "https://cdn.tailwindcss.com",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
                ],
                logLevel: 0,
            }}
            className = "h-full w-full">
            <SandpackErrorMonitor onErrorChange={setShowErrorOverlay}/> 
            <SandpackLayout className="h-full w-full border-none! bg-transparent!">   
                {/* {showCode && (
                    <SandpackCodeEditor showTabs showInlineErrors showLineNumbers wrapContent style={{height: "100%", flex: 1, minWidth: 0}} />
                )} */}
                   
            <SandpackPreview showNavigator={false} showRefreshButton={false} showOpenInCodeSandbox={false} showSandpackErrorOverlay={showErrorOverlay} 
                className="h-full w-full" />    
            </SandpackLayout> 
            </SandpackProvider>
            
        </div>
  )
}
