import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@exceptions/httpException';

type TargetValidationType = 'query' | 'body' | 'params';

type ValidationMiddlewareOptions = {
  type: any;
  target?: TargetValidationType;
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
};

const SupportedTargetValidation: TargetValidationType[] = ['query', 'body', 'params'];

/**
 * Recursively extract error messages from ValidationErrors, including nested errors.
 *
 * @param {ValidationError[]} errors Array of validation errors.
 * @returns {string[]} Array of error messages.
 */
const extractValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.flatMap((error: ValidationError) => {
    const constraints = Object.values(error.constraints ?? {});
    if (error.children && error.children.length > 0) {
      return [...constraints, ...extractValidationErrors(error.children)];
    }
    return constraints;
  });
};

/**
 * ValidationMiddleware
 *
 * Allows use of decorator and non-decorator based validation
 *
 * @param {Object} options
 * @param {any} options.type dto
 * @param {boolean} [options.skipMissingProperties=false] When skipping missing properties
 * @param {boolean} [options.whitelist=true] Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param {boolean} [options.forbidNonWhitelisted=true] If you would rather to have an error thrown when any non-whitelisted properties are present
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
export const ValidationMiddleware = ({
  type,
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = false,
  target = 'body',
}: ValidationMiddlewareOptions): ((req: Request, res: Response, next: NextFunction) => void) => {
  if (!target) {
    throw new Error('Target must be defined;');
  }

  if (SupportedTargetValidation.indexOf(target) === -1) {
    throw new Error('Target must be body, query or params;');
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req[target] ?? req.body);

    validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        req[target] = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const messages = extractValidationErrors(errors).join(', ');
        next(new HttpException(400, messages));
      });
  };
};
