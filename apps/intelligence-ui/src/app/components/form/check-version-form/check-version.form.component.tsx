'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './check-version.form.module.css';
import { CheckFormSchema, SemanticFormType } from './check-version.form.schema';
import usbService from '../../../services/usb-service/check-version.service';
import { checkVersion } from '../../../lib/check-version.util';

export const CheckVersionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SemanticFormType>({
    resolver: zodResolver(CheckFormSchema),
  });

  const [checking, setChecking] = useState(false);

  const onSubmitHandler = async (userInput: SemanticFormType) => {
    setChecking(true);
    const latestVersionResponse = await usbService.checkVersionRequest();

    if (checkVersion(userInput.version, latestVersionResponse)) {
      alert('you are up to date');
    } else {
      alert('you are not up to date');
    }

    setChecking(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Check USB</h2>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles.formContainer}
      >
        <div className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="version" aria-label="version">
              Version
            </label>
            <input
              data-testid="version-input"
              type="text"
              {...register('version')}
            />
          </div>

          <span className={styles.error}>{errors.version?.message}</span>
        </div>

        <div className={styles.actionContainer}>
          <span>{checking && 'Please wait... Checking'}</span>
          <input type="submit" value="Check Version" />
        </div>
      </form>
    </div>
  );
};

export default CheckVersionForm;
