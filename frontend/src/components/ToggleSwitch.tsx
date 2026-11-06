type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Describes what is being switched, for screen readers and for the tooltip. */
  label: string;
  disabled?: boolean;
  /** `sm` is for list rows, where the toggle sits beside a name and must not shout. */
  size?: 'sm' | 'md';
};

/**
 * A switch, not a checkbox.
 *
 * Used where the thing being controlled is a running behaviour rather than a saved preference:
 * turning the AI off for a lead stops it doing anything in that chat from that moment, and the
 * control should look like something that is currently on or off, not like a form field waiting
 * to be submitted.
 *
 * Deliberately a real `<button role="switch">` rather than a styled checkbox: it carries
 * `aria-checked`, it is reachable and operable from the keyboard for free, and the state is never
 * conveyed by colour alone - the knob's position says it too, which matters for the roughly one
 * in twelve men who cannot reliably separate the red from the green.
 */
const ToggleSwitch = ({ checked, onChange, label, disabled = false, size = 'md' }: Props) => {
  // iOS proportions: a pill track with a white knob that slides on a spring.
  const track = size === 'sm' ? 'h-5 w-8' : 'h-6 w-10';
  const knob = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const travel = size === 'sm' ? 'translate-x-3.5' : 'translate-x-[1.125rem]';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(event) => {
        // Rows are themselves buttons that open a thread; flipping the switch must not also
        // navigate.
        event.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex shrink-0 items-center rounded-full transition-colors duration-300 disabled:opacity-40 ${track} ${
        checked ? 'bg-green-500' : 'bg-panel-3'
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block transform rounded-full bg-[#fff] shadow-[0_2px_4px_rgb(0_0_0/20%),0_0_1px_rgb(0_0_0/20%)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${knob} ${
          checked ? travel : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
