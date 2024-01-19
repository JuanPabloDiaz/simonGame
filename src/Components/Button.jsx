import PropTypes from "prop-types";

const Button = ({ color, onPress }) => {
  const colorClasses = {
    red: "bg-red-500 rounded-tr-full border-8 border-black hover:bg-red-600",
    green:
      "bg-green-500 rounded-tl-full border-8 border-black hover:bg-green-600",
    blue: "bg-blue-500 rounded-br-full border-8 border-black hover:bg-blue-600",
    yellow:
      "bg-yellow-500 rounded-bl-full border-8 border-black hover:bg-yellow-600",
  };

  return (
    <button
      className={`m-2 h-60 w-60 ${colorClasses[color]}`}
      onClick={onPress}
    />
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["red", "green", "blue", "yellow"]).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
