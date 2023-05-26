import React from "react";

// Define the shape of the context state
interface IContextState {
	fromService: string;
	toService: string;
}

// Define the context type
interface IContextType extends IContextState {
	setFromService: (value: string) => void;
	setToService: (value: string) => void;
}

// Create the context (global state) with default values
export const Context = React.createContext<IContextType>({
	fromService: "",
	toService: "",
	setFromService: () => { },
	setToService: () => { },
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [fromService, setFromService] = React.useState("");
	const [toService, setToService] = React.useState("");

	return (
		<Context.Provider
			value={{
				fromService,
				toService,
				setFromService,
				setToService,
			}}
		>
			{children}
		</Context.Provider>
	);
};
