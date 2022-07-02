require "./bumper"

class NGrams(T, N)
  include ::Iterator(StaticArray(T, N))
  @iter : Iterator(T)
  @overlap : T?
  @end : Bool

  def initialize(@iter)
    @overlap = nil
    @end = false
    {% raise "NGrams must be at least 2 long" if N < 2 %}
  end

  def next
    return Iterator.stop if @end
    result = uninitialized StaticArray(T, N)
    if overlap = @overlap
      result[0] = overlap
      (1...N).each do |i|
        case value = @iter.next
        when Iterator::Stop
          @end = true
          (i...N).each do |j|
            result[j] = bumper_item T
          end
        else
          result[i] = @overlap = value
        end
      end
    else
      # first time
      case value = @iter.next
      when Iterator::Stop
        @end = true
        return Iterator.stop
      else
        result[0] = bumper_item T
        result[1] = @overlap = value
      end
      (2...N).each do |i|
        case value = @iter.next
        when Iterator::Stop
          @end = true
          (i...N).each do |j|
            result[j] = bumper_item T
          end
        else
          result[i] = @overlap = value
        end
      end
    end
    result
  end
end
