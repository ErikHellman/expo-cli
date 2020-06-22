import { CredentialsSource, Keystore } from '../../credentials/credentials';
import { CredentialsProvider } from '../../credentials/provider';
import { BuilderContext } from './build';
import prompts from '../../prompts';

export async function ensureCredentials(
  provider: CredentialsProvider,
  ctx: BuilderContext
): Promise<void> {
  const src = ctx.eas.credentialsSource;
  if (src === CredentialsSource.LOCAL) {
    await provider.useLocal();
  } else if (src === CredentialsSource.REMOTE) {
    await provider.useRemote();
  } else if (ctx.eas[provider.platform].workflow === 'managed') {
    if (await provider.hasLocal()) {
      await provider.useLocal();
    } else {
      await provider.useRemote();
    }
  } else if (ctx.eas[provider.platform].workflow === 'generic') {
    const hasLocal = await provider.hasLocal();
    const hasRemote = await provider.hasRemote();
    if (hasRemote && hasLocal) {
      if (!(await provider.isLocalSynced())) {
        const { confirm } = await prompts({
          type: 'confirm',
          name: 'confirm',
          message:
            'Your local credentials are not the same as remote ones. Do you want to update local credntials?', // TODO rephrase that
        });
        if (confirm) {
          await provider.useRemote();
          await provider.updateLocal();
        } else {
          const { select } = await prompts({
            type: 'select',
            name: 'select',
            message: 'Which credentials you want to use for this build?',
            choices: [
              { title: 'Local credentials.json', value: 'local' },
              { title: 'Credentials stored on Expo servers.', value: 'remote' },
            ],
          });
          if (select === 'local') {
            await provider.useLocal();
          } else {
            await provider.useRemote();
          }
        }
      }
    }
  }
}
