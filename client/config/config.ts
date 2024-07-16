interface IConfig {
  baseUrl: string;
}

const checkConfig = (server: string): IConfig | Record<string, never> => {
  let config: IConfig | Record<string, never> = {};

  switch (server) {
    case "production":
      config = {
        baseUrl: "",
      };
      break;
    case "local":
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "local";
export const config = checkConfig(selectServer) as IConfig;
