import { useDHConnect } from '@daohaus/connect';
import { FormBuilder } from '@daohaus/form-builder';
import { TXBuilder } from '@daohaus/tx-builder';

import { FORM } from '../legos/forms';

export const FormTest = () => {
  const { provider } = useDHConnect();

  return (
    <TXBuilder
      provider={provider}
      chainId="0x5"
      daoId="0xfbddea58ca7dd83e03fd16f3eeee94d4eeea6632"
      safeId="0x9dd0ef4a97825a77f35e03aefd412adf848d5341"
      appState={{}}
    >
      <FormBuilder form={FORM.SIGNAL} targetNetwork="0x5" />
    </TXBuilder>
  );
};
