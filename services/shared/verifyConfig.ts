function red(text: string) {
  return "\x1b[31m" + text + "\x1b[0m";
}

function green(text: string) {
  return "\x1b[32m" + text + "\x1b[0m";
}

export type ServiceEnv = { name: string; value?: string };

export function verifyConfig(envs: ServiceEnv[]): string[] {
  for (let i = 0; i < envs.length; i++) {
    const v = envs[i];
    if (!v.value) {
      console.error(red("Environment Error:"), v.name, red("is missing"));
      // @ts-ignore
      return process.exit(1);
    } else {
      console.log(green("Environment:"), v.name, green("is set to"), v.value);
    }
  }

  return envs.map((env) => env.value);
}
