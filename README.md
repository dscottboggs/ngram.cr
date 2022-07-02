# ngram

A Crystal Shard for iterating over arbitrarily-sized and typed N-grams. Given
any `Iterator(T)`, `Ngram(T, N)` will yield `StaticArray(T, N)` until the
Iterator is exhausted. The first element and any final element(s) of the
yielded n-grams are `bumper_item T`, which must be defined for any `T`. The
shard comes with definitions for `Char`, `String`, and any union with `Nil`.

This is based on my [ngram_iter](https://crates.io/crates/ngram_iter) rust
crate, which was in turn loosely inspired by the
[ngrams](https://crates.io/crates/ngrams) crate.

- [Documentation](https://dscottboggs.github.io/ngram.cr/)
- [Coverage Report](https://dscottboggs.github.io/ngram.cr/coverage/)

## Installation

1. Add the dependency to your `shard.yml`:

   ```yaml
   dependencies:
     ngram:
       github: dscottboggs/ngram.cr
   ```

2. Run `shards install`

## Usage

```crystal
require "ngram"

corpus = ('a'..'z').each
bigrams = Ngram(Char, 2).new corpus
bigrams.next # => StaticArray['\u{2060}', 'a']
trigrams = Ngram(Char, 3).new corpus
trigrams.next # => StaticArray['\u{2060}', 'a', 'b']
ten_grams = Ngram(Char, 10).new corpus
ten_grams.next # => StaticArray['\u2060', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

corpus = ([1, 2] of Int32?).each
bigrams = Ngram(Int32?, 2).new corpus
bigrams.next # => StaticArray[nil, 1]

# N must be 2 or more.
NGrams(Char, 1).new ['1'] # This will fail to compile
```
See [the tests](/spec/ngram_spec.cr) for more details on the behavior.

Arbitrary types can be used, but an overload for e.g. type `T`,
`bumper_item(T.class)` must be implemented in the top-level namespace. Crystal
doesn't really offer a way to document this in the code, but compilation will
fail if the function overload isn't present.

```crystal
record MyType, data : Int32, valid : Bool do
  def self.invalid
    new 0, false
  end

  def initialize(@data : Int32)
    @valid = true
  end

  def to_s
    if valid
      data.to_s
    else
      "invalid"
    end
  end

  def to_s(io : IO)
    io.write to_s
  end
end

def bumper_item(_type : MyType.class)
  MyType.invalid
end

data = [MyType.new(1), MyType.new(2)]
ngrams = Ngram(MyType, 2).new data.each

if (ngram = ngrams.next).is_a? Iterator::Stop
  raise "unreachable"
else
  ngram.map(&.to_s).to_a # => ["invalid", "1"]
end
```

This is a bit of a contrived example, but it demonstrates the flexibility of
the shard. Of course, you can always just use a nullable type and the bumepr
will be `nil`, but it may make more sense to use, for example,
`Float64::INFINITY`, or a particular enum variant.

## Contributing

1. Fork it (<https://github.com/dscottboggs/ngram/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [D. Scott Boggs](https://github.com/dscottboggs) - creator and maintainer
