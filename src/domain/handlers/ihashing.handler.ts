interface IHashingHandler {
  hashValue(value: string): string;
}

const IHashingHandler = Symbol('IHashingHandler');

export default IHashingHandler;
