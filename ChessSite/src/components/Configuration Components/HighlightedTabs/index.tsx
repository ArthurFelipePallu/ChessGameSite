import "./styles.css"
import { useState } from "react";
import { motion } from "framer-motion";
import ChessConfigBoardColorSchemeSelection from "../BoardColorSchemeSelection";

function EmptyComponent(){
    return (<></>);
}
const Tabs =[
    {
        "id": 0,
        "name":"board",
        "component":ChessConfigBoardColorSchemeSelection,
    },
    {
        "id": 1,
        "name":"pieces",
        "component":EmptyComponent,
    },
    {
        "id": 2,
        "name":"connection",
        "component":EmptyComponent,
    },
    {
        "id": 3,
        "name":"sounds",
        "component":EmptyComponent,
    },
    {
        "id": 4,
        "name":"account",
        "component":EmptyComponent,
    }
]



export default function HighlightedTabs(){
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const ActiveComponent = Tabs.find(
    (tab) => tab.id === highlightedIndex
  )?.component;


  return (
    <div className="container">
      <header>
        <ul className="tabs">
        {Tabs.map((tab) => (
          <li
            className={tab.id === highlightedIndex ? "active" : undefined}
            onClick={() => setHighlightedIndex(tab.id)}
            key={tab.id}
          >
            {tab.id === highlightedIndex && <motion.div
              className="active-highlight"
              transition={{
                layout: {
                  duration: 0.3,
                  
                }
              }}
              layoutId="highlight"
            />}
              {tab.id !== highlightedIndex && <div className="passive-highlight"></div>}
            <span>{tab.name}</span>
          </li>
        ))}
      </ul>
      </header>
      
      <div>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};