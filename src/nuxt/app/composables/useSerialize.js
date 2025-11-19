export const useSerialize = (data) => {
 return JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value));
};
