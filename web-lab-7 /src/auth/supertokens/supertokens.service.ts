import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/user/enum/role.enum';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    supertokens.init({
      appInfo: { ...config.appInfo },
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'fullName',
              },
              {
                id: 'phoneNumber',
              },
              {
                id: 'role',
                optional: true,
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                // override sign up using email / password
                signUpPOST: async function (input) {
                  const resp = await originalImplementation.signUpPOST(input);
                  if (resp.status === 'OK') {
                    const id = resp.user.id;

                    // create user in my own db
                    const newUser = new User();
                    newUser.id = id;
                    newUser.email = input.formFields[0].value;
                    newUser.password = input.formFields[1].value;
                    newUser.fullName = input.formFields[2].value;
                    newUser.phoneNumber = input.formFields[3].value;
                    if (input.formFields[4].value) {
                      newUser.role = Role[input.formFields[4].value];
                    }

                    await userRepository.save(newUser);

                    input.userContext.isSignUp = true;
                  }
                  return resp;
                },
              };
            },
          },
        }),
        Session.init({
          getTokenTransferMethod: () => 'cookie',
        }),
      ],
    });
  }
}
