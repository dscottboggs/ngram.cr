def bumper_item(_type : ::Char.class)
  '\u{2060}'
end

def bumper_item(_type : ::String.class)
  "\u{2060}"
end

def bumper_item(_type : T?.class) forall T
  nil
end
