import { MongoClient } from 'mongodb';
import { DB_NAMES } from './constants';

const { DB_USER, DB_PWD, DB_CLUSTER } = process.env;
const dbName = DB_NAMES.GAME_DB;

const uri = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_CLUSTER}/${dbName}?retryWrites=true&w=majority`;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const client: MongoClient = new MongoClient(uri, options);

export const getConnectedClient = async (): Promise<MongoClient> => {
	if (!client.isConnected()) {
		return client.connect();
	}
	return client;
};
