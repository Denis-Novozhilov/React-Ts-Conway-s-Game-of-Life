import WorldComponent from './components/World/WorldComponent';
import { World } from './models/World/World';

function App() {
	return (
		<>
			{/* <WorldComponent world={new World(10)} size={100} /> */}
			{/* <WorldComponent world={new World(100)} size={100} /> */}
			{/* <WorldComponent world={new World(50)} size={500} /> */}
			{/* <WorldComponent world={new World(100)} size={1000}/> */}
			{/* <WorldComponent world={new World(2)} size={500} /> */}
			{/* <WorldComponent world={new World(4)} size={400} /> */}
			<WorldComponent world={new World(3)} size={400} />
			{/* <WorldComponent world={new World(2)} size={400} /> */}
			{/* <WorldComponent world={new World(30)} size={500}/> */}
		</>
	);
}

export default App;
