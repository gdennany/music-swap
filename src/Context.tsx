import React from "react";

// Define the shape of the context state
interface IContextState {
	accessToken: string;
	fromService: string;
	toService: string;
}

// Define the context type
interface IContextType extends IContextState {
	setAccessToken: (value: string) => void;
	setFromService: (value: string) => void;
	setToService: (value: string) => void;
}

// Create the context (global state) with default values
export const Context = React.createContext<IContextType>({
	accessToken: "",
	fromService: "",
	toService: "",

	setAccessToken: () => { },
	setFromService: () => { },
	setToService: () => { },
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const [accessToken, setAccessToken] = React.useState("");
	const [fromService, setFromService] = React.useState("");
	const [toService, setToService] = React.useState("");

	return (
		<Context.Provider
			value={{
				accessToken,
				fromService,
				toService,

				setAccessToken,
				setFromService,
				setToService,
			}}
		>
			{children}
		</Context.Provider>
	);
};
