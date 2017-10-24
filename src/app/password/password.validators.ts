import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {

  /**
   * validation
   * @param control
   */
  static validOldPassword(control: AbstractControl) {
      return new Promise((resolve) => {
          if (control.value !== '1234')
              resolve({ invalidOldPassword: true });
          else
              resolve(null);
      });
  }

  /**
   * validation
   * @param control
   */
  static passwordsShouldMatch(control: AbstractControl) {
      let newPassword = control.get('newPassword');
      let confirmPassword = control.get('confirmPassword');

      if (newPassword.value !== confirmPassword.value)
          return { passwordsShouldMatch: true };

      return null;
  }
  /**
   * validation
   * @param control
   */
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
      if((control.value as string).indexOf(' ') >=0)
        return { cannotContainSpace: true };
      return null;
  }
}
