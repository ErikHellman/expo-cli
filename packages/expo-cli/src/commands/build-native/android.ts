import { Job } from '@expo/build-tools';

import { CredentialsSource, Keystore } from '../../credentials/credentials';
import { ensureCredentials } from './credentials';
import { credentialsJson } from '../../credentials/local';
import { AndroidCredentials, AndroidCredentialsProvider } from '../../credentials/provider';
import prompt from '../../prompts';
import { Builder, BuilderContext } from './build';

interface Options {
  credentialsSource: CredentialsSource;
  parent?: {
    nonInteractive?: boolean;
  };
}

class AndroidBuilder implements Builder {
  private credentials?: AndroidCredentials;

  constructor(public readonly ctx: BuilderContext) {}

  public async ensureCredentials(): Promise<void> {
    const provider = new AndroidCredentialsProvider(this.ctx.projectDir, {
      projectName: this.ctx.projectName,
      accountName: this.ctx.accountName,
    });
    await provider.init();
    await ensureCredentials(provider, this.ctx);
    const credentials = await provider.getCredentials();
    if (this.ctx.eas.android.workflow === 'generic') {
    }
  }

  public async prepareJob(archiveUrl: string): Promise<Job> {
    const job = {
      type: ctx.eas.workflow,
    };
    if (this.eas.buildCommand) {
    }
  }

  private async resolveKeystorePath(): Promise<string> {
    if (this.ctx.eas.android.workflow !== 'generic') {
      throw new Error('keystorePath is valid only for generic workflow');
    }
    if (await credentialsJson.exists(this.ctx.projectDir)) {
      const credentials = await credentialsJson.read(this.ctx.projectDir);
      return credentials?.android?.keystore?.keystorePath;
    } else {
      return './android/keystores/keystore.jks';
    }
  }
  //
  //    const keystore = await ctx.android.fetchKeystore(experienceName);
  //    await this.readCredentialsJson();
  //
  //    if (this.options.clearCredentials) {
  //      if (this.options.parent?.nonInteractive) {
  //        throw new BuildError(
  //          'Clearing your Android build credentials from our build servers is a PERMANENT and IRREVERSIBLE action, it\'s not supported when combined with the "--non-interactive" option'
  //        );
  //      }
  //      await runCredentialsManager(ctx, new RemoveKeystore(experienceName));
  //    }
  //
  //    const paramKeystore = await getKeystoreFromParams(this.options);
  //    if (paramKeystore) {
  //      await useKeystore(ctx, experienceName, paramKeystore);
  //    } else {
  //         }
  //
  //  }
  //
  //  async prepareRemote() {
  //    const ctx = new Context();
  //    await ctx.init(this.projectDir);
  //    const experienceName = `@${ctx.manifest.owner || ctx.user.username}/${ctx.manifest.slug}`;
  //
  //    await runCredentialsManager(
  //      ctx,
  //      new SetupAndroidKeystore(experienceName, {
  //        nonInteractive: this.options.parent?.nonInteractive,
  //      })
  //    );
  //
  //  }
  //
  //  async readLocal() {
  //    const credJson = credentialsJson.read(this.projectDir)
  //
  //  }
}

export { AndroidBuilder };
