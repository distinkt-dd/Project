import React, {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DownM, Icon, Plus } from '@shared/icons';
import styles from './Select.module.css';
import { Tag } from '../tag';

type SelectVariant = 'default' | 'tags';

interface Option {
  value: string;
  label: string;
}

export type SelectSize = 'L' | 'S';

interface SelectBaseProps {
  id?: string;
  name?: string;
  labelText?: string;
  options: Option[];
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  variant?: SelectVariant;
  size?: SelectSize;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

interface SingleSelectProps extends SelectBaseProps {
  multiple?: false;
  variant?: 'default';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

interface MultiSelectProps extends SelectBaseProps {
  multiple: true;
  variant?: 'default';
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

interface TagsSelectProps extends SelectBaseProps {
  multiple: true;
  variant: 'tags';
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type SelectProps =
  | SingleSelectProps
  | MultiSelectProps
  | TagsSelectProps;

type SelectComponent = {
  (
    props: SingleSelectProps & React.RefAttributes<HTMLButtonElement>
  ): React.ReactElement | null;
  (
    props: MultiSelectProps & React.RefAttributes<HTMLButtonElement>
  ): React.ReactElement | null;
  (
    props: TagsSelectProps & React.RefAttributes<HTMLButtonElement>
  ): React.ReactElement | null;
  displayName?: string;
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const {
      id,
      name,
      labelText,
      options,
      disabled,
      required,
      fullWidth = false,
      variant,
      size = 'L',
      className,
      onBlur,
    } = props;
    const isMultiple = props.multiple === true;
    const isTagSelect = (variant ?? 'default') === 'tags';

    const generatedId = useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(
      !props.multiple ? (props.defaultValue ?? '') : ''
    );
    const [internalValues, setInternalValues] = useState<string[]>(
      props.multiple ? (props.defaultValue ?? []) : []
    );
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const selectedValue = !props.multiple
      ? props.value !== undefined
        ? props.value
        : internalValue
      : '';
    const selectedValues = useMemo(
      () =>
        props.multiple
          ? props.value !== undefined
            ? props.value
            : internalValues
          : [],
      [props.multiple, props.value, internalValues]
    );

    const selectedOption = useMemo(
      () => options.find((option) => option.value === selectedValue),
      [options, selectedValue]
    );
    const selectedOptions = useMemo(
      () => options.filter((option) => selectedValues.includes(option.value)),
      [options, selectedValues]
    );

    const displayText = isMultiple
      ? (labelText ?? '')
      : (selectedOption?.label ?? labelText ?? '');
    const hasValue = isMultiple
      ? selectedOptions.length > 0
      : Boolean(selectedOption);

    const close = () => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    };

    const selectOption = (optionValue: string) => {
      if (props.multiple) {
        const nextValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((value) => value !== optionValue)
          : [...selectedValues, optionValue];

        if (props.value === undefined) {
          setInternalValues(nextValues);
        }
        props.onChange?.(nextValues);
        return;
      }

      if (props.value === undefined) {
        setInternalValue(optionValue);
      }
      props.onChange?.(optionValue);
      close();
    };

    useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          close();
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [isOpen]);

    const openWithHighlight = () => {
      const currentIndex = isMultiple
        ? options.findIndex((option) => selectedValues.includes(option.value))
        : options.findIndex((option) => option.value === selectedValue);
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      setIsOpen(true);
    };

    const handleToggle = () => {
      if (disabled || options.length === 0) return;

      if (isOpen) {
        close();
        return;
      }

      openWithHighlight();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || options.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            openWithHighlight();
            return;
          }
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
        case 'Enter':
        case ' ':
          if (isOpen) {
            event.preventDefault();
            const highlighted = options[highlightedIndex];
            if (highlighted) {
              selectOption(highlighted.value);
            }
          }
          break;
        case 'Escape':
          if (isOpen) {
            event.preventDefault();
            close();
          }
          break;
        case 'Tab':
          close();
          break;
      }
    };

    const highlightedOption = options[highlightedIndex];

    return (
      <div
        className={[
          styles.container,
          styles[`size${size}`],
          fullWidth ? styles.fullWidth : '',
        ]
          .filter(Boolean)
          .join(' ')}
        ref={containerRef}
      >
        {name &&
          (isMultiple ? (
            selectedValues.map((value) => (
              <input
                key={value}
                type="hidden"
                name={name}
                value={value}
                disabled={disabled}
              />
            ))
          ) : (
            <input
              type="hidden"
              name={name}
              value={selectedValue}
              required={required}
              disabled={disabled}
            />
          ))}
        <button
          type="button"
          id={selectId}
          ref={ref}
          className={[
            styles.trigger,
            hasValue ? styles.hasValue : styles.placeholder,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-label={
            isMultiple && selectedValues.length > 0
              ? `${labelText}, выбрано ${selectedValues.length}`
              : labelText
          }
          aria-activedescendant={
            isOpen && highlightedOption
              ? `${listboxId}-option-${highlightedIndex}`
              : undefined
          }
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
        >
          {isTagSelect ? (
            <span className={styles.tagTriggerValue}>
              <span className={styles.tagTriggerLabel}>{labelText ?? ''}</span>
              <Plus
                width={16}
                height={16}
                className={styles.tagTriggerPlusIcon}
                aria-hidden="true"
              />
            </span>
          ) : (
            <span className={styles.value}>{displayText}</span>
          )}
          {!isTagSelect && (
            <DownM
              className={[styles.arrow, isOpen ? styles.arrowOpen : '']
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
          )}
        </button>
        {isOpen && options.length > 0 && (
          <ul
            id={listboxId}
            className={[styles.dropdown, isTagSelect ? styles.tagsDropdown : '']
              .filter(Boolean)
              .join(' ')}
            role="listbox"
            aria-labelledby={selectId}
            aria-multiselectable={isMultiple || undefined}
          >
            {options.map((option, index) => {
              const isSelected = isMultiple
                ? selectedValues.includes(option.value)
                : option.value === selectedValue;
              const isHighlighted = index === highlightedIndex;

              return (
                <li
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  className={[
                    styles.option,
                    isTagSelect ? styles.tagOption : '',
                    isMultiple && !isTagSelect ? styles.multiOption : '',
                    isHighlighted ? styles.highlighted : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    selectOption(option.value);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {isTagSelect ? (
                    <Tag
                      variant="select"
                      bgColor={isSelected ? 'green' : 'neutral'}
                      textColor="black"
                      className={
                        isHighlighted ? styles.tagOptionHighlighted : undefined
                      }
                      rightIconName={isSelected ? 'minus' : 'plus'}
                      rightIconSize={12}
                    >
                      {option.label}
                    </Tag>
                  ) : (
                    <>
                      <span className={styles.optionLabel}>{option.label}</span>
                      {isMultiple && (
                        <span
                          className={[
                            styles.checkbox,
                            isSelected ? styles.checkboxChecked : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          aria-hidden="true"
                        >
                          {isSelected && (
                            <Icon
                              name="check"
                              size={16}
                              className={styles.checkIcon}
                            />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
) as SelectComponent;

Select.displayName = 'Select';
